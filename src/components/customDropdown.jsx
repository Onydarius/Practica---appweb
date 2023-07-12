/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';




function CustomDropdown(props) {

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="row item-value dropdown-element">
                    <i className={option.icon} ></i>
                    <div className='dropdown-element-text'>{option.label}</div>
                </div>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const countryOptionTemplate = (option) => {
        return (
            <div className="row item-value dropdown-element">
                <i className={option.icon} ></i>
                <div className='dropdown-element-text'>{option.label}</div>
            </div>
        );
    }

    return (
        <div className='input-container'>
            <label className='input-label'>{props.title}</label>
            <Dropdown
                value={props.value}
                className='input'
                options={props.options}
                onChange={props.onChange}
                optionLabel="name"
                placeholder={props.placeholder}
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
            />
            <br />
        </div>
    )
}





export default CustomDropdown;
