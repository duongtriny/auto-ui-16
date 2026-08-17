import { Page } from "@playwright/test";
import { CommonPage } from "./common-page";

export class LoginPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }
}