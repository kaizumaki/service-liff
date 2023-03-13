import React from 'react'

interface Prop {
    text: string
    big?: boolean
    bgColor?: string
}

const Button = (props: Prop) => {
return (
    <div className={props.big?"card big":"card"}>
      <div className="card-body" style={{backgroundColor: props.bgColor!==undefined? props.bgColor: "#94d052"}}>
        {props.text}
      </div>
    </div>
  )
}

export default Button
