```js
const store = createStore({
    name: 'John',
    age: 35
    abilities: {
        katana: 'hight'
    }
});

store.listen('abilities.katana', () => {

})
export function useStore(store, key = '') {
  let [, forceRender] = React.useState({})

  React.useEffect(() => {
    let unbind = store.listen(key, () => {
      forceRender({})
    })

    return unbind
  }, [store])

  return getValue(store)
}

    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

castPath
toKey
function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }
```

```js
function get(object, path, value) {
  const pathArray = Array.isArray(path)
    ? path
    : path.split(".").filter((key) => key);
  const pathArrayFlat = pathArray.flatMap((part) =>
    typeof part === "string" ? part.split(".") : part
  );
  const checkValue = pathArrayFlat.reduce(
    (obj, key) => obj && obj[key],
    object
  );
  return checkValue === undefined ? value : checkValue;
}
```

```ts
var typesHandlers = new Map([
  [Array.prototype, (payload, key) => payload[key]],
  [Object.prototype, (payload, key) => payload[key]],
  [Map.prototype, (payload, key) => payload.get(key)],
]);

var handle = (payload, key) => {
  let h = typesHandlers.get(Object.getPrototypeOf(payload));
  return h && h(payload, key);
};

var get = (object, path) => {
  const pathArray = Array.isArray(path)
    ? path
    : path.split(".").filter((key) => key);
  const pathArrayFlat = pathArray.map((part) =>
    typeof part === "string" ? part.split(".") : part
  );
  return pathArray.reduce((obj, key) => obj && handle(obj, key), object);
};
```
