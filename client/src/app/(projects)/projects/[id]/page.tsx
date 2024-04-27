"use client"
import { useParams } from "next/navigation"

const ProyectPage = () => {

    const params = useParams();

  return (
    <div>
      <h1>Proyect Page: {params.id}</h1>
    </div>
  )
}

export default ProyectPage