import { connect } from 'react-redux'
import walletInfoSelector, { detectToken, addToken, registerToken } from '../../store/models/walletInfo'


const mapStateToProps = (state: State) => {
    let selector = walletInfoSelector(state)

    return {
        ...selector
    }
}

const mapDispatchToProps = {
    detectToken,
    addToken,
    registerToken,
}

export default connect(mapStateToProps, mapDispatchToProps)