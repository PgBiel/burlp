declare class SampleClass {}

declare namespace burlp {

  type PathPrefix<R extends object> = {
    (): PathPrefix<R>;
    (text: string, ...moreText: string[]): Path<R>;
    <T extends object>(requester: (path: string) => T): PathPrefix<T>;
    (wrapFuncOrClass: (...args: any[]) => any | typeof SampleClass, wrap: true): PathPrefix<object>;
    (wrapObj: object): PathPrefix<R>;
    [prop: string]: Path<R>;
  }

  type Path<R extends object = object> = {
    (): R;
    (text: string, ...moreText: string[]): Path<R>;
    [prop: string]: Path<R>;
  }

  type Export = {
    setReq: burlp.setReq;
    setRequester: burlp.setReq;
  } & { [prop: string]: burlp.PathPrefix<object>; }

  type setReq = {
    (requester: (path: string) => object): true;
    (wrapFuncOrClass: (...args: any[]) => any | typeof SampleClass, wrap: true): true;
    (wrapObj: object): true;
  }
}

declare var exp: burlp.Export;

export = exp;
