import * as puppeteer from "puppeteer";

class Crawler {
    private static browser;

    public static async getBrowserContext() {
        if(!this.browser) {
            this.browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        }
        const context = await this.browser.createIncognitoBrowserContext();
        return context;
    }
}

export default Crawler;
