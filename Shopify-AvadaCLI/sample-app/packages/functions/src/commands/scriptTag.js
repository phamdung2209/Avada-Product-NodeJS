// import Shopify from 'shopify-api-node';
const Shopify = require('shopify-api-node')

;(async () => {
    const shopify = new Shopify({
        shopName: 'avada-dungpv.myshopify.com',
        accessToken: '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',
    })
    const scripttag = await shopify.scriptTag.list()
    console.log('scripttag', scripttag)
    // await shopify.scriptTag.create({
    //     event: 'onload',
    //     src: 'https://avada.local.com/scripttag/index.min.js',
    // })

    // await shopify.scriptTag.delete(201535520812)
    // await shopify.scriptTag.delete(201441280044)
})()
