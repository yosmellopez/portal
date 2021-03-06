<!doctype html>
<html class="no-js" lang="en" dir="ltr">
<head>
    <base href="/"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Portal</title>
    <meta name="description" content="Description for Portal">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="shortcut icon" href="favicon.ico"/>
    <link rel="manifest" href="manifest.webapp"/>
    <link rel="stylesheet" href="content/css/loading.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style type="text/css">
        body, html {
            height: 90%;
        }

        .app-loading {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .app-loading .spinner {
            height: 200px;
            width: 200px;
            animation: rotate 1s linear infinite;
            transform-origin: center center;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }

        .app-loading .spinner .path {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            animation: dash 1.5s ease-in-out infinite;
            stroke-linecap: round;
            stroke: #039be5;
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes dash {
            0% {
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
            }
            50% {
                stroke-dasharray: 89, 200;
                stroke-dashoffset: -35px;
            }
            100% {
                stroke-dasharray: 89, 200;
                stroke-dashoffset: -124px;
            }
        }
    </style>
    <!-- jhipster-needle-add-resources-to-root - JHipster will add new resources here -->
</head>
<body>
<!--[if lt IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<jhi-main>
    <!-- loading layout replaced by app after startupp -->
    <div class="app-loading">
        <div class="applogo"></div>
        <svg class="spinner" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="1" stroke-miterlimit="10"/>
        </svg>
    </div>
</jhi-main>
<noscript>
    <h1>You must enable javascript to view this page.</h1>
</noscript>
<script type="text/javascript" language="javascript">
    // show an error message if the app loading takes more than 5 sec
    window.onload = function () {
        setTimeout(showError, 4000);
    }

    function showError() {
        var errorElm = document.getElementById("jhipster-error");
        if (errorElm && errorElm.style) {
            errorElm.style.display = "block";
        }
    }
</script>
<!-- uncomment this for adding service worker
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(function () {
                        console.log('Service Worker Registered');
                    });
            });
        }
    </script>
-->
<!-- Google Analytics: uncomment and change UA-XXXXX-X to be your site's ID.
<script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X');ga('send','pageview');
</script>-->
</body>
</html>
