import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" type="image/png" href="/images/favicon.png"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script
  defer
  src="https://www.paypal.com/sdk/js?client-id=Ab4GOYM71RTyN-GEXmQu3JJ5knG6B5GXRMT0jl8jq2cziM8-XzN-M3vljtugo47itghswsAYs0QRml2u"
></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument;