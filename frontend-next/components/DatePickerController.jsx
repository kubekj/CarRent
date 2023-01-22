import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl'

export default function DatePickerController(props) {

    const { ctrlName, control, onDateChange, selectedVal, className, dateFormat, ...attr } = props;

    registerLocale('pl', pl);

    return (
        <div className={className}>
            <Controller
                name={ctrlName}
                control={control}
                render={({ field: { onChange, value },
                    fieldState: { error } }) => (
                    <>
                    <DatePicker
                        onChange={(date) => {
                            onChange(date);
                            onDateChange(date);
                        }}
                        dateFormat={dateFormat ? dateFormat : "dd-MM-yyyy"}
                        locale="pl"
                        className="datePicker"
                        disabledKeyboardNavigation
                        { ...attr }
                    />
                    <span className="invalid-feedback">{error?.message}</span>
                    </>
                )}
            />
        </div>
    );
}