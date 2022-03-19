import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const MyDropdown = ({ value, setValue, items, notNull, direction }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const onItemClick = (item) => {
    setValue(item);
    toggle();
  };

  return (
    <Dropdown
      isOpen={open}
      toggle={toggle}
      direction={direction ? direction : "down"}
    >
      <DropdownToggle tag="a" className="btn btn-info btn-sm" caret>
        {value !== "" ? items[value] : "No items chosen"}
      </DropdownToggle>

      <DropdownMenu container="body">
        {Object.keys(items).map((i) => (
          <DropdownItem onClick={() => onItemClick(i)} key={i}>
            {items[i]}
          </DropdownItem>
        ))}
        <DropdownItem divider></DropdownItem>
        {!notNull ? (
          <DropdownItem onClick={() => onItemClick("")}>
            Not chosen
          </DropdownItem>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MyDropdown;
