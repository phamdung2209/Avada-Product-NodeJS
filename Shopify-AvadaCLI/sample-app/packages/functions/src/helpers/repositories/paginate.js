import isEmpty from '@functions/helpers/utils/isEmpty';
import cleanEmptyField from '@functions/helpers/utils/cleanEmptyField';
import {Timestamp} from '@google-cloud/firestore/build/src';

const toDateFields = [
  'createdAt',
  'updatedAt',
  'billedAt',
  'sentAt',
  'scheduledAt',
  'updated_at',
  'created_at',
  'timestamp',
  'lastSync'
];

/**
 *
 * @param queriedRef
 * @param collection
 * @param query
 * @param limit
 * @param selectFields
 * @param orderBy
 * @param orderDir
 * @returns {Promise<{data: *, count, hasNext: boolean, hasPre: boolean}>}
 */
export async function paginateFirestore({
  queriedRef,
  collection,
  query = {getAll: true},
  limit = '12',
  selectFields = [],
  orderBy = false,
  orderDir = 'DESC'
}) {
  const getAll = query.getAll || !limit;
  let hasPre = false;
  let hasNext = false;

  if (orderBy) {
    queriedRef = queriedRef.orderBy(orderBy, orderDir);
  }

  if (!getAll) {
    if (query?.after) {
      const after = await collection.doc(query.after).get();
      queriedRef = queriedRef.startAfter(after);

      hasPre = true;
    }
    if (query?.before) {
      const before = await collection.doc(query.before).get();
      queriedRef = queriedRef.endBefore(before).limitToLast(parseInt(limit));

      hasNext = true;
    } else {
      queriedRef = queriedRef.limit(parseInt(limit));
    }
  }
  if (selectFields.length > 0) {
    queriedRef = queriedRef.select(...selectFields);
  }

  const docs = await queriedRef.get();
  const data = docs.docs.map(doc => {
    const data = doc.data();
    toDateFields.forEach(field => {
      if (data.hasOwnProperty(field) && data[field] instanceof Timestamp) {
        data[field] = data[field].toDate();
      }
    });
    return {id: doc.id, ...data};
  });

  if (!getAll && (!hasPre || !hasNext)) {
    const [resultHasPre, resultHasNext] = await Promise.all([
      verifyHasPre(docs, queriedRef),
      verifyHasNext(docs, queriedRef)
    ]);
    if (!hasPre) {
      hasPre = resultHasPre;
    }
    if (!hasNext) {
      hasNext = resultHasNext;
    }
  }
  return {data, hasPre, hasNext, count: docs.size};
}

/**
 * @param {QuerySnapshot} objectDocs
 * @param {Query} queriedRef
 * @returns {Promise<boolean>}
 */
export async function verifyHasPre(objectDocs, queriedRef) {
  if (objectDocs.empty) {
    return false;
  }

  const preRef = await queriedRef
    .endBefore(objectDocs.docs[0])
    .limit(1)
    .get();

  return !preRef.empty;
}

/**
 * @param {QuerySnapshot} objectDocs
 * @param {Query} queriedRef
 * @returns {Promise<boolean>}
 */
export async function verifyHasNext(objectDocs, queriedRef) {
  if (objectDocs.empty) {
    return false;
  }

  const nextRef = await queriedRef
    .startAfter(objectDocs.docs[objectDocs.size - 1])
    .limitToLast(1)
    .get();

  return !nextRef.empty;
}

/**
 * @param {Collection<Document>} collection
 * @param {*} dbQuery
 * @param {number|*} order
 * @param {number|*} page
 * @param {number|string|*} limit
 * @param countTotal
 * @param total
 * @param before
 * @param after
 * @param {[]} aggregate
 * @param {string} selectFields
 * @returns {Promise<{data: *, count: number|*, hasNext: boolean|*, hasPre: boolean|*}>}
 */
export async function paginateMongo({
  collection,
  dbQuery,
  order,
  limit = 20,
  page = 1,
  countTotal = false,
  total = 0,
  before = null,
  after = null,
  aggregate = [],
  selectFields = ''
}) {
  const $match = cleanEmptyField(dbQuery);
  const $project = prepareSelectFields(selectFields);
  const $limit = parseInt(limit);
  const $aggregate = [{$match}, ...aggregate];
  const dataAggregate = [...$aggregate, {$addFields: {id: {$toString: '$_id'}}}, {$project}];

  if ($limit === 0) {
    const data = await collection.aggregate(dataAggregate, {allowDiskUse: true}).toArray();
    return {data, count: data.length};
  }

  if (countTotal) {
    const isCounted = (before || after) && total;
    if (isCounted) return total;
    if (aggregate.length === 0) {
      if (isEmpty($match)) {
        return {count: await collection.estimatedDocumentCount()};
      }
      return {count: await collection.countDocuments($match)}; // filter by dbQuery if aggregation is empty
    }
    const [totalResp] = await collection.aggregate([...$aggregate, {$count: 'total'}]).toArray();
    return {count: totalResp?.total || 0};
  }

  if (order) {
    const [sortField, direction] = getSortType(order, true);
    dataAggregate.push({$sort: {[sortField]: direction}});
  }
  const data = await collection
    .aggregate([...dataAggregate, {$skip: $limit * (page - 1)}, {$limit: $limit + 1}], {
      allowDiskUse: true
    })
    .toArray();
  return {
    data: data.slice(0, $limit),
    hasPre: page > 1,
    hasNext: data.length > $limit
  };
}

/**
 * @param sortType
 * @param toMongoDb
 * @returns {string[]|*}
 */
export function getSortType(sortType, toMongoDb = false) {
  const [sortField, direction] = sortType ? sortType.split('_') : ['createdAt', 'desc'];
  return [sortField, toMongoDb ? convertSortDir(direction) : direction];
}

/**
 * @param {'desc' | 'asc'} direction
 * @returns {number}
 */
function convertSortDir(direction = 'desc') {
  return direction === 'asc' ? 1 : -1;
}

function prepareSelectFields(selectFields) {
  const excludeFields = {_id: 0};
  if (!selectFields.length) return excludeFields;
  const allFields = Array.isArray(selectFields) ? selectFields : selectFields.split(',');
  return allFields.reduce((prev, current) => ({...prev, [current]: 1}), {
    ...excludeFields,
    id: {$toString: '$_id'}
  });
}

// /**
//  * @returns {Promise<null|number|*>}
//  */
// export async function getNextIncrementId(collection, filter = {}) {
//   try {
//     const list = await collection
//       .find(filter)
//       .sort('incrementId', 'desc')
//       .limit(1)
//       .toArray();
//
//     if (list.length === 0) {
//       return 1;
//     }
//
//     return presentIdString(list[0]).incrementId + 1;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// }
