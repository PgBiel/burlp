import { SnekfetchOptions, methods } from "snekfetch";
import * as Snekfetch from "snekfetch";

declare class SampleClass {}

declare namespace burlp {

  type func = (opts?: SnekfetchOptions) => Snekfetch;

  type ReturnVal = {
    version: string,
    METHODS: methods,
    acl: func,
    bind: func,
    checkout: func,
    connect: func,
    copy: func,
    delete: func,
    get: func,
    head: func,
    link: func,
    lock: func,
    msearch: func,
    merge: func,
    mkactivity: func,
    mkcalendar: func,
    mkcol: func,
    move: func,
    notify: func,
    options: func,
    patch: func,
    post: func,
    propfind: func,
    proppatch: func,
    purge: func,
    put: func,
    rebind: func,
    report: func,
    search: func,
    subscribe: func,
    trace: func,
    unbind: func,
    unlink: func,
    unlock: func,
    unsubscribe: func,
    brew: func
  }

  type PathPrefix<R extends object> = {
    (): PathPrefix<R>;
    (text: string, ...moreText: string[]): Path<R>;
    <T extends object>(requester: (path: string) => T): PathPrefix<T>;
    (wrapFuncOrClass: (...args: any[]) => any | typeof SampleClass, wrap: true): PathPrefix<object>;
    (wrapObj: object): PathPrefix<R>;
    [prop: string]: Path<R>;
  }

  type Path<R extends object = ReturnVal> = {
    (): R;
    (text: string, ...moreText: string[]): Path<R>;
    [prop: string]: Path<R>;
  }

  type Export = {
    [prop: string]: burlp.PathPrefix<ReturnVal>;
  }
}

declare var exp: burlp.Export;

export = exp;
