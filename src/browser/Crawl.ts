import * as puppeteer from "puppeteer";

class Crawler {
    private static browser;

    public static async getBrowserContext() {
        if(!this.browser) {
            this.browser = await puppeteer.launch();
        }
        const context = await this.browser.createIncognitoBrowserContext();
        return context;
    }
}

export default Crawler;