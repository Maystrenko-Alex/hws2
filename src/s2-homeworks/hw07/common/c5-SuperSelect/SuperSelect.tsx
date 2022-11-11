import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
    className,
    onChange,
    onChangeOption,
    ...restProps
}) => {
    const mappedOptions: any[] = options
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // делают студенты
        console.log((e.currentTarget.value))
        onChangeOption?.(Number(e.currentTarget.value))
    }
    const styleHead = restProps.value === 0 ? { color: 'rgb(180, 180, 180)' } : {}
    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            style={styleHead}
            className={finalSelectClassName}
            onChange={onChangeCallback}
            title={'Select'}
            {...restProps}
        >
            <option className={s.defaultSelect} value='0' >Select</option>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
