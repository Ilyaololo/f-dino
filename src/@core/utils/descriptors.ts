/**
 * Define a class method descriptor.
 */
export function Descriptor(meta: TypedPropertyDescriptor<any>): MethodDecorator {
  return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    descriptor.configurable = meta.configurable;
    descriptor.enumerable = meta.enumerable;
    descriptor.writable = meta.writable;

    return descriptor;
  };
}
