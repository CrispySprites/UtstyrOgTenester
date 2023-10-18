import { Customer } from "./customer";
import { Offerings } from "./offerings";

export class RentalAgreement {
  id?: number;
  Offerings?: Offerings;
  Customer?: Customer
  from = "";
  to = "";
}
