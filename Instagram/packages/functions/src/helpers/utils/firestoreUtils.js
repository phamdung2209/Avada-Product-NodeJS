export function formatDateFields(data) {
  const fields = Object.keys(data);
  fields.forEach(field => {
    if (data[field] && data[field].toDate && data[field].toDate()) {
      data[field] = data[field].toDate();
    }
  });
  return data;
}

export function presentDataFromDoc(doc, ...presenters) {
  if (!doc || !doc.exists) {
    return null;
  }
  let data = {id: doc.id, ...doc.data()};

  while (presenters.length) {
    const handler = presenters.shift();
    data = handler(data);
  }

  return data;
}

export function presentDataAndFormatDate(doc, ...presenters) {
  return presentDataFromDoc(doc, formatDateFields, ...presenters);
}
