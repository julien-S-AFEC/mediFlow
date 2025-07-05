import { Dispatch, SetStateAction, useState } from "react";
import { Permissions } from "../../types";

type Iprops = {
  permissions?: Permissions;
  setDashboardVisibleHandler: Dispatch<SetStateAction<boolean>>;
};

const OptionsWidget: React.FC<Iprops> = ({ permissions, setDashboardVisibleHandler }) => {
  return (
    <div className="d-flex mx-2 gap-2">
      {Boolean(permissions?.create_patient)
        && (<div
          className="btn btn-primary text-nowrap"
          onClick={() => setDashboardVisibleHandler((oldValue) => !oldValue)}>
          Add patient
        </div>)}
    </div>
  );
};

export default OptionsWidget;
