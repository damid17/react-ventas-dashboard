import initialState from "../store/initialState";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, logueado: true, token: action.payload.apikey, idVendedor: action.payload.idVendedor};
        case "NUEVAS_VENTAS":
            return { ...state, idVentas: [...state.idVentas, action.payload]};
        case "CANT_VENTAS":
            return { ...state, cantVent: action.payload};
        case "PAQUETES":
            return { ...state, paquetes: action.payload};
        case "VENTAS":
                return { ...state, ventas: action.payload};
        default:
            return state;
    }
}

export default reducer;