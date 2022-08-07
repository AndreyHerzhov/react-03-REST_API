import { Material } from "components/Material/Material"

export const MaterialsList = ({items, ...otherProps}) => {
    return <ul>
        {items.map(item => (<li key={item.id}>
            <Material item={item} {...otherProps}/>
        </li>
        ))}
    </ul>
}