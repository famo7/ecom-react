import React from 'react';
import Select from 'react-select';

const SideBar = () => {
  const options = [
    { value: 1, label: 'Price: Low to High' },
    { value: 2, label: 'Price: High to Low' },
    { value: 3, label: 'A...Z' },
    { value: 4, label: 'Z...A' },
  ];

  return (
    <div className="side-bar mt-7">
      <h3 className="text-lg font-semibold border-b-2 pb-4 mb-10 ">Filter</h3>
      <div className="border-b-2 pb-4">
        <p className="mt-5 text-sm font-semibold pb-5">Sort by</p>
        <Select options={options} />
      </div>
      <div className="pb-4">
        <p className="mt-5 text-sm font-semibold pb-5">Category</p>
        <div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <span className="label-text pr-9">Men</span>
              <input type="checkbox" className="checkbox" />
            </label>
            <label className="label cursor-pointer justify-start">
              <span className="label-text pr-3">Women</span>
              <input type="checkbox" className="checkbox" />
            </label>
            <label className="label cursor-pointer justify-start">
              <span className="label-text pr-9">Kids</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
