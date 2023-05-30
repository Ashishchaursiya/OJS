import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {
    products, 
    productsCollectionSix, 
    productsCollectionSeven, 
    productsCollectionEight, 
    productsCollectionNine, 
    productsCollectionTen, 
    productsCollectionEleven,
    productsCovid19,
    productsGrocery,
    productsElectronics,
    productsFurniture
} from '../json-data/products';

let store

import { 
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY, 
    ADD_SHIPPING,
    ADD_QUANTITY_WITH_NUMBER,
    RESET_CART,
    ADD_TO_COMPARE,
    REMOVE_ITEM_FROM_COMPARE
} from '../actions/action-types/action-names'

const initialState = {
    products: [],
    productsCollectionSix: productsCollectionSix,
    productsCollectionSeven: productsCollectionSeven,
    productsCollectionEight: productsCollectionEight,
    productsCollectionNine: productsCollectionNine,
    productsCollectionTen: productsCollectionTen,
    productsCollectionEleven: productsCollectionEleven,
    productsCovid19: productsCovid19,
    productsGrocery: productsGrocery,
    productsElectronics: productsElectronics,
    productsFurniture: productsFurniture,
    addedItems:[],
    addedItemsToCompare:[],
    total: 0,
    shipping: 0,
    
}
function applyCharge(value) {
    let charge = 0;
    if (value > 0 && value <= 0.5) {
      charge = 23.5;
    } else if (value > 0.5 && value <= 1.0) {
      charge = 26.9;
    } else if (value > 1.0 && value <= 1.5) {
      charge = 30.4;
    } else if (value > 1.5 && value <= 2.0) {
      charge = 34.7;
    } else if (value > 2.0 && value <= 2.5) {
      charge = 38.2;
    } else if (value > 2.5 && value <= 3.0) {
      charge = 42.1;
    } else if (value > 3.0 && value <= 3.5) {
      charge = 45.3;
    } else if (value > 3.5 && value <= 4.0) {
      charge = 49.4;
    } else if (value > 4.0 && value <= 4.5) {
      charge = 52.4;
    } else if (value > 4.5 && value <= 5.0) {
      charge = 56.4;
    } else if (value > 5.0 && value <= 5.5) {
      charge = 59.0;
    } else if (value > 5.5 && value <= 6.0) {
      charge = 62.3;
    } else if (value > 6.0 && value <= 6.5) {
      charge = 64.9;
    } else if (value > 6.5 && value <= 7.0) {
      charge = 68.2;
    } else if (value > 7.0 && value <= 7.5) {
      charge = 70.8;
    } else if (value > 7.5 && value <= 8.0) {
      charge = 74.2;
    } else if (value > 8.0 && value <= 8.5) {
      charge = 76.7;
    } else if (value > 8.5 && value <= 9.0) {
      charge = 80.1;
    } else if (value > 9.0 && value <= 9.5) {
      charge = 82.7;
    } else if (value > 9.5 && value <= 10.0) {
      charge = 86.0;
    } else {
      charge = 86.0;
    }
    return charge;
  }
const reducers = (state = initialState, action) => {
   
    if(action.type === ADD_TO_CART){
      console.log('ADD_TO_CART',state)
        let addedItem = state.products.find(item => item.id === action.id) 
        
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if(existed_item){
            addedItem.quantity += 1 
            return {
                ...state,
                total: Number((state.total + addedItem.price).toFixed(2)),
                // shipping: (state.total + addedItem.price)
            }
        } else {
            let addedItem = {}
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal,
                shipping: addedItem.charge
            }
            
        }
    }

    if(action.type === ADD_TO_COMPARE){
        let addedItemToCompare = state.products.find(item => item.id === action.id)
        || state.productsCollectionSix.find(item => item.id === action.id)
        || state.productsCollectionSeven.find(item => item.id === action.id)
        || state.productsCollectionEight.find(item => item.id === action.id)
        || state.productsCollectionNine.find(item => item.id === action.id)
        || state.productsCollectionTen.find(item => item.id === action.id)
        || state.productsCollectionEleven.find(item => item.id === action.id)
        || state.productsCovid19.find(item => item.id === action.id)
        || state.productsGrocery.find(item => item.id === action.id)
        || state.productsElectronics.find(item => item.id === action.id)
        || state.productsFurniture.find(item => item.id === action.id)
        
        addedItemToCompare.quantity = 1;
        
        return {
            ...state,
            addedItemsToCompare: [...state.addedItemsToCompare, addedItemToCompare]
        }
    }

    if(action.type === ADD_QUANTITY_WITH_NUMBER){
           console.log('ADD_QUANTITY_WITH_NUMBER',state)
        
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item=> action.id === item.id && action.obj.price==item.price)
        if(existed_item)
        {
            existed_item.quantity += action.qty
            existed_item.charge =  applyCharge(Number(existed_item.weight*existed_item.quantity))
            let totalWeight = state.addedItems.reduce((total, obj) => total + (obj.weight*obj.quantity), 0) 
            let shippingCharge = applyCharge(Number(totalWeight))
            console.log('shipping charge',shippingCharge)
            return {
                ...state,
                total: Number((state.total + existed_item.price * action.qty).toFixed(2)),
                 shipping:  shippingCharge

            }
        } else {
           
            let addedItem = {}
            addedItem.quantity = action.qty;
            addedItem.id = action.id;
            addedItem.price = action.obj.price;
            addedItem.color = action.obj.color;
            addedItem.size = action.obj.size;
            addedItem.img = action.obj.img;
            addedItem.Name = action.obj.Name;
            addedItem.id2 = action.obj.id2;
            addedItem.weight = action.obj.weight;
            addedItem.charge = applyCharge(Number(action.obj.weight*action.qty))

            //calculating the total
            let totalWeight = state.addedItems.reduce((total, obj) => total + (obj.weight*obj.quantity), 0) + Number(action.obj.weight*action.qty)
            let shippingCharge = applyCharge(Number(totalWeight))
            // let shippingCharge = state.addedItems.reduce((total, obj) => total + obj.charge, 0) + addedItem.charge
            console.log('shipping charge',shippingCharge)
            let newTotal = state.total + addedItem.price * action.qty

            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : Number(newTotal.toFixed(2)),
                shipping:Number(shippingCharge.toFixed(2))
            }
            
        }
    }

    if(action.type === REMOVE_ITEM){
      console.log('REMOVE_ITEM',state)
       // let itemToRemove = state.addedItems.find(item=> action.id === item.id)
        let itemToRemove = state.addedItems[action.id]
        // let new_items = state.addedItems.filter(item=> action.id !== item.id)
        let newArr = [...state.addedItems]
        newArr.splice(action.id,1)
        let totalWeight = newArr.reduce((total, obj) => total + (obj.weight*obj.quantity), 0) 
        let shippingCharge = totalWeight == 0 ? 0 : applyCharge(Number(totalWeight))
        // let shippingCharge = newArr.reduce((total, obj) => total + obj.charge, 0) 
        console.log('total weight',totalWeight)
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );
        //let shippingCharge =state.shipping - applyCharge(Number(itemToRemove.weight*itemToRemove.quantity))

        return {
            ...state,
            addedItems: newArr,
            total: Number(newTotal.toFixed(2)),
            shipping:Number((shippingCharge).toFixed(2))
        }
    }

    if(action.type === REMOVE_ITEM_FROM_COMPARE){
        let new_items = state.addedItemsToCompare.filter(item=> action.id !== item.id)
        
        return {
            ...state,
            addedItemsToCompare: new_items
        }
    }

    if(action.type === ADD_QUANTITY){
      console.log('ADD_QUANTITY',state)
        let addedItem = state.addedItems.find(item=> item.id === action.id)
        addedItem.quantity += 1 
        addedItem.charge =   applyCharge(Number(addedItem.weight*addedItem.quantity))
        let newTotal = state.total + addedItem.price
        let totalWeight = state.addedItems.reduce((total, obj) => total + (obj.weight*obj.quantity), 0) 
        let shippingCharge = applyCharge(Number(totalWeight))
        // let shippingCharge = state.addedItems.reduce((total, obj) => total + obj.charge, 0) 
        console.log('shipping charge',shippingCharge)
        return {
            ...state,
            total: newTotal,
             shipping:Number((shippingCharge).toFixed(2))
        }
    }

    if(action.type === SUB_QUANTITY){  
      console.log('SUB_QUANTITY',state)
        let addedItem = state.addedItems.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        
        if(addedItem.quantity === 1){
          // console.log('quantity 1 is called')
          //   let new_items = state.addedItems.filter(item=>item.id !== action.id)
          //   let newTotal = state.total - addedItem.price
          //   let shippingCharge = state.shipping - applyCharge(Number(addedItem.weight*addedItem.quantity))
          //   return {
          //       ...state,
          //       addedItems: new_items,
          //       total: newTotal,
          //        //shipping:Number((shippingCharge).toFixed(2))
          //   }
        } else {
          
            addedItem.quantity -= 1
            addedItem.charge = applyCharge(Number(addedItem.weight*addedItem.quantity))
            // let shippingCharge = state.addedItems.reduce((total, obj) => total + obj.charge, 0) 
            let totalWeight = state.addedItems.reduce((total, obj) => total + (obj.weight*obj.quantity), 0) 
            let shippingCharge = applyCharge(Number(totalWeight))
        console.log('shipping charge',shippingCharge)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal,
                 shipping:Number((shippingCharge).toFixed(2))
            }
        }
        
    }

    if(action.type === ADD_SHIPPING){
        return {
            ...state,
            shipping: state.shipping += 6
        }
    }

    if(action.type === 'SUB_SHIPPING'){
        return {
            ...state,
            shipping: state.shipping -= 6
        }
    }

    if(action.type === RESET_CART){
        return {
            ...state,
            addedItems: [],
            total: 0,
            shipping: 0
        }
    }
    
    else {
        return state
    }
}

const initStore = (preloadedState = initialState) => {
    return createStore(
        reducers,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
  
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
  
    return _store
}

export const useStore = (initialState) => {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
  