import { createAction, props } from "@ngrx/store";
import { Vendor } from "src/app/models/vendor.model";

/* -------- Loading ---------- */
export const getVendors = createAction("[Vendors Component] Get Vendors");

export const loadVendors = createAction("[Vendors API] Load Vendors");

export const loadVendorsSuccess = createAction(
    "[Vendors API] Vendors load success",
    props<{ vendors: Vendor[] }>()
);

export const loadVendorsFail = createAction(
    "[Vendors API] Vendors load failure",
    props<{ error: string }>()
);

/* -------- Creating ---------- */
export const createVendor = createAction(
    "[New Vendor Component] Create new Vendor",
    props<{ vendor: Vendor }>()
);

export const createVendorSuccess = createAction(
    "[Vendors API] Vendor create success",
    props<{ vendor: Vendor }>()
);

export const createVendorFail = createAction(
    "[Vendors API] Vendor create failure",
    props<{ error: string }>()
);

/* -------- Updating ---------- */
export const updateVendor = createAction(
    "[New Vendor Component] Update new Vendor",
    props<{ id: number; vendor: Vendor }>()
);

export const updateVendorSuccess = createAction(
    "[Vendors API] Vendor update success",
    props<{ vendor: Vendor }>()
);

export const updateVendorFail = createAction(
    "[Vendors API] Vendor update failure",
    props<{ error: string }>()
);

/* -------- Deleting ---------- */
export const deleteVendor = createAction(
    "[Vendor Component] Delete Vendor",
    props<{ id: number }>()
);

export const deleteVendorSuccess = createAction(
    "[Vendors API] Vendor delete success",
    props<{ id: number }>()
);

export const deleteVendorFail = createAction(
    "[Vendors API] Vendor delete failure",
    props<{ error: string }>()
);
