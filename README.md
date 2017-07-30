# burlp
Create URLs with fashion I guess

## Installation

`npm install burlp`

## Usage

This is all about [Proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), so make sure you have at least node 6.0.0 to use this module.
All examples assume you have done the following first:
```js
const burlp = require("burlp");
const { http, https } = burlp;
```

The module export itself is a proxy, actually. And this is because it is designed to support any prefix (`prefix://`) to build. This means that, when you defined `http` and `https` above, you were starting to build an URL with the prefix `http://` or `https://`, but it is re-usable. This means that you can freely build URLs using one of them without having to reset them.

### Building

And how do we build? Well, just access properties. That's pretty much it.

```js
const myURL = https.google.com;
```

We have built an url for `https://google.com`, but it is still a proxy. This means that you can still access anything and it will add on to it. Before we talk about requesters, to get the generated URL, just add a `.toString()`. Like this:

```js
const myURL = https.google.com.toString();
```

### Special names

Well, you know you need to access properties to build the URL. To get the string URL, we had to call `.toString`, right? Well, what if you were unfortunate to have to build an URL to a website named "toString"?
It's not just "toString", here are the list of the special names:
* toString;
* constructor;
* valueOf;
* inspect.

Accessing any of those will return a function that contains the generated URL. What if the website was named "constructor"? "inspect"? Here's how to do it:

```js
const myURL = https("inspect").com.toString(); // instead of "inspect" it can also be any string, it will add on.
```

### Requesters

Great, we've got our string URL. But, you can actually simplify the work of feeding the URL to a requesting module (e.g. [`superagent`](https://www.npmjs.com/package/superagent)) by using the requesters feature, which lets you provide a function to be called upon a call of no arguments to the URL object. In other words, a function that is called when you do this:

```js
https.google.com();
```

By default, [`snekfetch`](https://www.npmjs.com/package/snekfetch) is used as the requester (it's set as a dependency). This means that once you called it you could do, for example, `.get().send({ this: 1 })`. However, you can still set your own requester.

To set it, we use the prefix object (in this case, `https`, but remember that it can be any). It is a function as well, so we call it.

There are two different reactions depending on the arguments passed. The first one is passing a function as the first one, and that's pretty much it. The function must accept one parameter that is the URL generated and return some object. For example, some object that you can do `.get()` or `.request()`. Your choice.
For example:

```js
const https = burlp.https(path => {
  return {
    get(blah1, blah2) {
      return myLib.get(path, blah1, blah2).then(response => response.body);
    }
  }
});
```

The second reaction is by giving an object or passing `true` as the second argument. This will cause it to wrap the object in a function and all of its properties that are functions as well. And what will this do? Well, say you pass this argument:

```js
const https = burlp.https({ thing: (url, somethingElse) => doSomethingWithUrl(url, somethingElse) });
```
The requester will wrap the function and will make it so you don't need to pass the `url` parameter, so you can just call `https.google.com().thing(somethingElse)` and it will work. This means that to directly use libraries like `superagent`, this can come in handy.

(Remember the part of the `true` argument. If the requester is a function or a class and you want to use the wrap functionality, pass `true` as well.)

### URL paths

To include a slash, you can use `["/"]` or `("/")`. Both will work. And, once you do it once, you don't have to do it multiple times (any more accessing will result in adding a slash for each).

### Troubleshooting

If when you complete a URL path (a.k.a. when you do `urlPathHere()`) you get an error like `Class constructor "something" cannot be invoked without 'new'`, that means you passed a class as the requester. To add the wrapping functionality, in that case, you have to pass `true` as the second argument.
