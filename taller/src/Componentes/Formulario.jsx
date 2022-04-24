import React from 'react'
import { nanoid } from 'nanoid'
import { firebase } from '../firebase.js'

const Formulario = () => {

    const [id, setId] = React.useState('')
    const [juego, setJuego] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [categoria, setCategoria] = React.useState('')
    const [horasJuego, setHorasJuego] = React.useState('')
    const [jugador, setJugador] = React.useState('')
    const [estadoJuego, setEstadoJuego] = React.useState('')
    const [notasJuego, setNotasJuego] = React.useState('')
    const [listajuegos, setListajuegos] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const dataBase = firebase.firestore
                const data = await dataBase.collection('Juegos').get()
                const arrayData = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))

                // console.log(arrayData)
                setListajuegos(arrayData)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    })

    const guardarJuegos = async (e) => {
        e.preventDefault()

        if (!juego.trim()) {
            alert('Especifique el juego')
            setError('Digite le juego')
            return
        }

        if (!descripcion.trim()) {
            alert('Agregue una Descripción del juego')
            setError('Agregue una Descripción del juego')
            return
        }

        if (!categoria.trim()) {
            alert('Agregue la categoria del juego')
            setError('Agregue la categoria del juego')
            return
        }

        if (!horasJuego.trim()) {
            alert('Coloque la cantidad de horas dedicadas al juego')
            setError('Coloque la cantidad de horas dedicadas al juego')
            return
        }

        if (!jugador.trim()) {
            alert('Especifique el nombre del jugador')
            setError('Especifique el nombre del jugador')
            return
        }

        if (!estadoJuego.trim()) {
            alert('Especifique el estado del juego')
            setError('Especifique el estado del juego')
            return
        }

        if (!notasJuego.trim()) {
            alert('Coloque algunas notas sobre el juego')
            setError('Coloque algunas notas sobre el juego')
            return
        }

        /**setListajuegos([
            ...listajuegos,
            {
                id: nanoid(), nombrejuego: juego, Descripcion: descripcion, Categoria: categoria,
                TiempoJugado: horasJuego, nombreJugador: jugador, estadoJuego: estadoJuego, notasJuego: notasJuego
            }
        ])*/

        const dataBase = firebase.firestore()
        const nuevoJuego = {
            nombrejuego: juego,
            Descripcion: descripcion,
            Categoria: categoria,
            TiempoJugado: horasJuego,
            nombreJugador: jugador,
            estadoJuego: estadoJuego,
            notasJuego: notasJuego
        }

        const data = await dataBase.collection('Juegos').add(nuevoJuego)

        e.target.reset()
        setJuego('')
        setDescripcion('')
        setCategoria('')
        setHorasJuego('')
        setJugador('')
        setEstadoJuego('')
        setNotasJuego('')
        setError(null)
    }

    const editar = item => {
        setJuego(item.nombrejuego)
        setDescripcion(item.Descripcion)
        setCategoria(item.Categoria)
        setHorasJuego(item.TiempoJugado)
        setJugador(item.jugador)
        setEstadoJuego(item.estadoJuego)
        setNotasJuego(item.notasJuego)
        setModoEdicion(true)
        setId(item.id)
    }

    const editarJuegos = e => {
        e.preventDefault()
        const arrayEditado = listajuegos.map(
            item => item.id === id ? {
                id: id, nombrejuego: juego, Descripcion: descripcion, Categoria: categoria,
                TiempoJugado: horasJuego, nombreJugador: jugador, estadoJuego: estadoJuego, notasJuego: notasJuego
            } : item
        )
        setListajuegos(arrayEditado)
        setId('')
        setJuego('')
        setDescripcion('')
        setCategoria('')
        setHorasJuego('')
        setEstadoJuego('')
        setJugador('')
        setNotasJuego('')
    }

    const eliminar = id => {
        const aux = listajuegos.filter(item => item.id !== id)
        setListajuegos(aux)
    }

    const cancelar = () => {
        setModoEdicion(false)
        setId('')
        setJuego('')
        setDescripcion('')
        setCategoria('')
        setHorasJuego('')
        setJugador('')
        setEstadoJuego('')
        setNotasJuego('')
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center'>Fomulario</h2>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'> Listado de Juegos </h4>
                    <ul className='list-group'>
                        {
                            listajuegos.map((item) => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>{item.nombrejuego}-{item.Descripcion}-{item.Categoria}-{item.TiempoJugado}
                                        -{item.nombreJugador}-{item.estadoJuego}
                                    </span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                    <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>
                                        Editar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar datos' : 'Agregar datos'
                        }
                        <form onSubmit={modoEdicion ? editarJuegos : guardarJuegos}>
                            <input
                                className='form-control mb-2'
                                type="text"
                                placeholder='Ingrese juego'
                                onChange={(e) => setJuego(e.target.value)}
                            />
                            <input
                                className='form-control mb-2'
                                placeholder='Ingrese descripción del Juego'
                                type="text"
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <input
                                className='form-control mb-2'
                                placeholder='Ingrese categoria del Juego'
                                type="text"
                                onChange={(e) => setCategoria(e.target.value)}
                            />
                            <input
                                className='form-control mb-2'
                                placeholder='Ingrese las horas de juego'
                                type="text"
                                onChange={(e) => setHorasJuego(e.target.value)}
                            />
                            <input
                                className='form-control mb-2'
                                placeholder='Ingrese el nombre del jugador'
                                type="text"
                                onChange={(e) => setJugador(e.target.value)}
                            />
                            <input
                                className='form-control mb-2'
                                placeholder='Estado del juego (Completado o Sin finalizar)'
                                type="text"
                                onChange={(e) => setEstadoJuego(e.target.value)}
                            />
                            <input
                                className='form-control mb-2'
                                placeholder='Notas o pensamientos del juego'
                                type="text"
                                onChange={(e) => setEstadoJuego(e.target.value)}
                            />

                            {
                                modoEdicion ?
                                    (
                                        <>
                                            <button
                                                className='btn btn-warning btn-block'
                                                type='submit'
                                            >Editar</button>
                                            <button
                                                className='btn btn-darck btn-block mx-2'
                                                onClick={() => cancelar()}
                                            >Cancelar</button>
                                        </>
                                    )
                                    :
                                    <button
                                        className='btn btn-primary btn-block'
                                        type='submit'>
                                        Agregar
                                    </button>
                            }
                        </form>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Formulario