# 2
## 2.0
### 2.0.0 (Initial)
This version removed `burlp#setReq` and `burlp#setRequester` while keeping individual requesters for prefixes. This is due to possible conflicts between libs. So, a default requester, [`snekfetch`](https://npmjs.com/snekfetch), was introduced as a dependency.

# 1
## 1.1
### 1.1.3
Updated examples to the recommended requester form in README.

### 1.1.2
Made typings and fixed prefix() to accept an unlimited number of text to add on and return itself when no arguments are passed.

### 1.1.1
Made it so requester setting functions don't require a second argument for the wrap functionality if the first argument is an object (it still requires it if the first argument is a function or a class). Also updated README.

## 1.0
### 1.0.1
Updated README to include recommended way to set requester.

### 1.0.0 (Initial)
This was created
