import {
    accountAccess as accountAccessFixtures,
    categoryPage as categoryPageFixtures,
    cartPage as cartPageFixtures,
    homePage as homePageFixtures,
    myAccountMenu as myAccountMenuFixtures,
    wishlist as wishlistFixtures,
    productPage as productPageFixtures
} from '../../../fixtures';
import {
    cartPage as cartPageActions,
    categoryPage as categoryPageActions,
    myAccountMenu as myAccountMenuActions,
    productPage as productPageActions,
    wishlistPage as wishlistPageActions
} from '../../../actions';
import {
    myAccountMenu as myAccountMenuAssertions,
    wishlist as wishlistAssertions,
    categoryPage as categoryPageAssertions
} from '../../../assertions';

const {
    firstName,
    lastName,
    accountEmail,
    accountPassword
} = accountAccessFixtures;
const { wishlistPage } = myAccountMenuFixtures;
const { categorySweaters, productCarinaCardigan } = categoryPageFixtures;
const { cartPageRoute } = cartPageFixtures;
const { homePage } = homePageFixtures;
const { wishlistRoute } = wishlistFixtures;
const {
    productValeriaTwoLayeredTank,
    silverAmorBandleSet
} = productPageFixtures;

const { moveProductFromCartToSigleWishlist } = cartPageActions;
const { goToMyAccount } = myAccountMenuActions;
const { addProductToWishlistFromCategoryPage } = categoryPageActions;
const {
    addProductToWishlistFromProductPage,
    addSimpleProductToCartFromProductPage
} = productPageActions;
const { removeProductFromSingleWishlist } = wishlistPageActions;

const { assertCreateAccount } = myAccountMenuAssertions;
const {
    assertWishlistHeading,
    assertEmptyWishlistExists,
    assertProductInWishlist,
    asserProductNotInWishlist
} = wishlistAssertions;
const { assertWishlistSelectedProductOnCategoryPage } = categoryPageAssertions;

// TODO add tags CE, EE to test to filter and run tests as needed
describe('verify single wishlist basic features', () => {
    it('user should be able to add and remove products from wishlist', () => {
        cy.visitPage(homePage);

        cy.openLoginDialog();
        cy.createAccount(
            accountAccessFixtures.firstName,
            lastName,
            accountEmail,
            accountPassword
        );

        assertCreateAccount(firstName);

        goToMyAccount(firstName, wishlistPage);

        assertWishlistHeading(wishlistPage);
        assertEmptyWishlistExists('Wish List');

        cy.visitPage(categorySweaters);
        addProductToWishlistFromCategoryPage(productCarinaCardigan);
        assertWishlistSelectedProductOnCategoryPage(productCarinaCardigan);
        cy.visitPage(wishlistRoute);

        assertProductInWishlist(productCarinaCardigan);

        cy.visitPage(productValeriaTwoLayeredTank.url);
        addProductToWishlistFromProductPage();
        cy.visitPage(wishlistRoute);

        assertProductInWishlist(productCarinaCardigan);
        assertProductInWishlist(productValeriaTwoLayeredTank.name);

        cy.visitPage(silverAmorBandleSet.url);
        addSimpleProductToCartFromProductPage();
        cy.visitPage(cartPageRoute);
        moveProductFromCartToSigleWishlist(silverAmorBandleSet.name);
        cy.visitPage(wishlistRoute);

        assertProductInWishlist(productCarinaCardigan);
        assertProductInWishlist(productValeriaTwoLayeredTank.name);
        assertProductInWishlist(silverAmorBandleSet.name);

        removeProductFromSingleWishlist(productCarinaCardigan);

        asserProductNotInWishlist(productCarinaCardigan);
    });
});
