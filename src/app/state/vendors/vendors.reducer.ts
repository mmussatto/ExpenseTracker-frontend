import { createReducer, on } from "@ngrx/store";
import { Vendor } from "src/app/models/vendor.model";
import {
    createVendor,
    createVendorFail,
    createVendorSuccess,
    deleteVendor,
    deleteVendorFail,
    deleteVendorSuccess,
    loadVendors,
    loadVendorsFail,
    loadVendorsSuccess,
    updateVendor,
    updateVendorFail,
    updateVendorSuccess,
} from "./vendors.actions";

/** Vendors State */
export interface VendorsState {
    vendors: Vendor[];
    error: string | null;
    status: "NOT_LOADED" | "LOADING" | "LOADED" | "ERROR" | "PENDING";
}

export const initialState: VendorsState = {
    vendors: [],
    error: null,
    status: "NOT_LOADED",
};

export const vendorReducer = createReducer(
    initialState,

    /* -------- Loading ---------- */
    on(loadVendors, (state) => ({ ...state, status: "LOADING" as const })),

    on(loadVendorsSuccess, (state, { vendors }) => ({
        ...state,
        vendors: vendors,
        error: null,
        status: "LOADED" as const,
    })),

    on(loadVendorsFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Creating ---------- */
    on(createVendor, (state) => ({ ...state, status: "PENDING" as const })),

    on(createVendorSuccess, (state, { vendor }) => ({
        ...state,
        vendors: [...state.vendors, { ...vendor }],
        error: null,
        status: "LOADED" as const,
    })),

    on(createVendorFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Updating ---------- */
    on(updateVendor, (state) => ({ ...state, status: "PENDING" as const })),

    on(updateVendorSuccess, (state, { vendor }) => ({
        ...state,
        vendors: state.vendors.map((value) =>
            value.id === vendor.id
                ? {
                      ...value,
                      name: vendor.name,
                      type: vendor.type,
                      url: vendor?.url,
                      address: vendor?.address,
                  }
                : value
        ),
        error: null,
        status: "LOADED" as const,
    })),

    on(updateVendorFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Deleting ---------- */
    on(deleteVendor, (state, { id }) => ({ ...state, status: "PENDING" as const })),

    on(deleteVendorSuccess, (state, { id }) => ({
        ...state,
        vendors: state.vendors.filter((v) => v.id != id),
        error: null,
        status: "LOADED" as const,
    })),

    on(deleteVendorFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    }))
);
