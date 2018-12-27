"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwrapFirestoreDoc = exports.queryFirestore = void 0;

/***************************************************/

/** Takes ref and queries it ********************/

/** Returning the JS document as a Javascript Obj */

/**************************************************/
const queryFirestore = async function queryFirestore(query) {
  let snapshot;

  try {
    snapshot = await query.get();
  } catch (e) {
    return Promise.reject(e);
  }

  return unwrapFirestoreDoc(snapshot);
};
/***************************************************/

/** Takes a Snapshot and returns the queried item */

/** adding _id and _path to the queried document  */

/**************************************************/


exports.queryFirestore = queryFirestore;

const unwrapFirestoreDoc = function unwrapFirestoreDoc(snapshot) {
  //If it is a multi-document query
  // returns am array of items
  if (snapshot.docs) {
    let items = [];

    for (const doc of snapshot.docs) {
      let item = doc.data();
      item.id = doc.id;
      item.path = doc.ref.path;
      items.push(item);
    }

    if (!items) {
      return [];
    }

    return items;
  } //If it is a single-document query
  // returns a single item


  if (!snapshot.docs) {
    let item = snapshot.data();

    if (item) {
      item.id = snapshot.id;
      item.path = snapshot.ref.path;
    }

    return item;
  }
};

exports.unwrapFirestoreDoc = unwrapFirestoreDoc;