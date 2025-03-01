//

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firestoreInit";

export async function getUserCartProducts(currentUser) {
  const snapshot = await getDoc(doc(db, "usersCart", currentUser.uid));
  const databaseCart = snapshot.exists() ? snapshot.data().myCart || [] : [];

  console.log("from firestore Utils", databaseCart);

  const productIds = databaseCart
    .map((cartItem) => cartItem.productId)
    .filter((id) => id !== undefined);

  // splitting productIds into chunks, each chunk contains 10 productIds
  // Because firebase has a limit of 10 docs at a time for query - where("id", "in", productIds)
  const chunkSize = 10;
  const productChunks = productIds.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  // querying products from firebase for each chunk of 10 productIds
  const productPromises = productChunks.map(async (chunk) => {
    const products = await getDocs(
      query(collection(db, "products"), where("id", "in", chunk))
    );

    return products.docs.map((doc) => doc.data());
  });

  // products is an array of sub-arrays
  const products = await Promise.all(productPromises);

  // concatenating all products into a single array
  const flatProducts = products.flat();

  const userCart = databaseCart.map((cartItem) => {
    const product = flatProducts.find((prod) => prod.id === cartItem.productId);
    return { ...product, quantity: cartItem.quantity };
  });

  // const userCartPromises = snapshot.data().myCart.map(async (cartItem) => {
  //   const { productId, quantity } = cartItem;
  //   const product = await getDoc(doc(db, "products", productId));
  //   return { ...product.data(), quantity };
  // });

  // const userCart = await Promise.all(userCartPromises);
  console.log(userCart, databaseCart);
  return { userCart, databaseCart };
}
export const updateCartInFirestore = async (databaseCart, currentUser) => {
  try {
    await updateDoc(
      doc(db, "usersCart", currentUser.uid),
      {
        myCart: [...databaseCart],
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};
