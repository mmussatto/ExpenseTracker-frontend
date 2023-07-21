import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { VendorsState } from "./vendors.reducer";

export const selectVendorsState = (state: AppState) => state.vendors;

export const selectAllVendors = createSelector(
    selectVendorsState,
    (state: VendorsState) => state.vendors
);

export const selectPaymentMethodById = (id: number) =>
    createSelector(selectVendorsState, (state: VendorsState) => {
        return state.vendors.find((vendor) => vendor.id === id);
    });
