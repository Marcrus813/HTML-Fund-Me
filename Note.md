# HTML project

## Up-front

-   When building Dapps, usually work with 2 repos
    -   One for contracts
    -   One for front end

Full stack -> Smart contracts (backend) + HTML(Front end)

---

## Related concepts

### Plugins and browser

Wallets add TOKEN(e.g. Ethereum) object `window.ethereum` to HTML source, we can use this to check whether the browser installed wallet or not

> Wallets have a node connected to them, need to connect to node to interact with chain

---

## Basic HTML

### `window.ethereum`

This is for MetaMask, there are other ways to do with other wallets

-   Connecting to wallet
    -   MetaMask
        -   `window.ethereum.request({ method: "eth_requestAccounts" });`, once connected the website can make MetaMask API calls

### Difference between NodeJS and Front-end JS

-   Imports
    -   NodeJS: `require()`, Front end: `import`
    -   Pkgs
        -   With raw HTML/Front-end, no, later with framework and Pkgs, still yarn add, the framework will convert pkgs to front-end for us

## Calling function from front-end

Fetch ABI from backend(etc., Other project)

> Side note:
> Getting `MetaMask RPC Error` related to nonce, need to reset account in MetaMask

-   Problem
    -   [ ] Node console keeps complaining about `NotEnoughETH`, even with enough ETH sent or even before pressing confirm, but txn passes, still to figure out why

---

## Event listening

See code comment