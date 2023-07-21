import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentMethodService } from "./services/payment-methods.service";

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [PaymentMethodService],
})
export class PaymentMethodsModule {}
