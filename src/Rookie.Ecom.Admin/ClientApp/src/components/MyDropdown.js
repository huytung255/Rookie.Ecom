import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const MyDropdown = ({ value, setValue, items }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const onItemClick = (item) => {
    setValue(item);
    toggle();
  };
  return (
    <Dropdown isOpen={open} toggle={toggle}>
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
        <DropdownItem onClick={() => onItemClick("")}>Not chosen</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MyDropdown;
