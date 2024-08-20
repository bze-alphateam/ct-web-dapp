# 🖥️ Blockchain module

The blockchain part of this application was developed as a **Cosmos SDK module** and introduces the ability to work with the following resources:

* Accepted Domain
* Publisher
* Article

## Accepted Domain <a href="#id-2bc1" id="id-2bc1"></a>

In order to keep the users away from malicious websites the network accepts articles only from **accepted internet domains**. These domains are voted by the community and accepted only through governance proposals. You can view the list of accepted domains directly on the blockchain [here](https://rest.getbze.com/bze/cointrunk/v1/accepted\_domain).

{% hint style="info" %}
Do note that subdomains of an accepted domain are **NOT** automatically accepted. Even if “medium.com” is an accepted domain, “bze.medium.com” links will not be accepted. Each subdomain needs to be accepted by the community.
{% endhint %}

## Publisher

A publisher is in fact an address that was voted through governance proposal to be marked as “publisher” on the network. Once the address is accepted it can publish **unlimited articles** at the cost of a blockchain transaction. You can view the list of publishers directly on the blockchain [here](https://rest.getbze.com/bze/cointrunk/v1/publishers) or on the [web app](https://app.cointrunk.io/publishers).&#x20;

## Article

Articles are composed by **title**, **URL** and **picture URL**. **URL** and **picture URL** have to be hosted on an **accepted domain**, otherwise the article can **not** be submitted to the network. You can view the articles published on the blockchain [here](https://rest.getbze.com/bze/cointrunk/v1/articles?pagination.count\_total=false\&pagination.limit=50\&pagination.reverse=true) or on the [web app](https://app.cointrunk.io/?page=1).
