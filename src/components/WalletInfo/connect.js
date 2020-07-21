import { connect } from 'react-redux'
import walletInfoSelector, { detectToken, addToken, registerToken } from '../../store/models/walletInfo'
import { updateBrowserWallet, updatePassphrase } from '../../store/actions/walletInfo';


const mapStateToProps = (state: State) => {
    let selector = walletInfoSelector(state)

    return {
        ...selector,
    }
}

const mapDispatchToProps = {
    detectToken,
    addToken,
    registerToken,
    updateBrowserWallet,
    updatePassphrase
}

export default connect(mapStateToProps, mapDispatchToProps)
