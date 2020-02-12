# odex-client
ODEX decentralized exchange front end

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![Chat on discord](https://img.shields.io/discord/308323056592486420.svg?logo=discord)](https://discord.gg/gvxeqMf)

# The ODEX Decentralized Exchange

The ODEX decentralized exchange is a hybrid decentralized exchange that aims at bringing together the ease of use of centralized exchanges along with the security and privacy features of decentralized exchanges. Orders are matched through the an off-chain orderbook. After orders are matched and signed, the decentralized exchange operator (matcher) has the sole ability to perform a transaction to the Autonomous Agent. This provides for the best UX as the exchange operator is the only party having to interact directly with the DAG. Exchange users simply sign orders which are broadcasted then to the orderbook. This design enables users to queue and cancel their orders seamlessly.

Several matchers can operate exchanges based on ODEX technology at the same time. They share their orderbooks and exchange all new orders among themselves, thus improving liquidity for all ODEX exchanges. An order can be submitted through any ODEX exchange, however to be matched, both maker and taker orders have to indicate the same matcher. The exchange that was used to submit the order serves as an affliate and can charge a fee from its users.  Anyone can become a matcher or affiliate, or just watch the orders that are being exchanged among the matchers and detect any possible misbehavior by matchers.


# Contributions

Thank you for considering helping the ODEX project! We accept contributions from anyone and are grateful even for the smallest fixes.

If you want to help ODEX, please fork and setup the development environment of the appropriate repository. In the case you want to submit substantial changes, please get in touch with our development team on #odex channel in [Obyte discord](https://discord.obyte.org) to verify those modifications are in line with the general goal of the project and receive early feedback. Otherwise you are welcome to fix, commit and send a pull request for the maintainers to review and merge into the main code base.

Please make sure your contributions adhere to our coding guidelines:

Code must adhere as much as possible to standard conventions (DRY - Separation of concerns - Modular)
Pull requests need to be based and opened against the master branch
Commit messages should properly describe the code modified
Ensure all tests are passing before submitting a pull request

# Contact

If you have questions, ideas or suggestions, you can reach our development team on #odex channel in [Obyte discord](https://discord.obyte.org)

## Credits

ODEX frontend is based on [AMP Exchange](https://github.com/Proofsuite/amp-client), the most beautiful and easy to use decentralized exchange.

# License

All the code in this repository is licensed under the MIT License, also included here in the LICENSE file.
