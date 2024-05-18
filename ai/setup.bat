@echo off
REM Note: Use VPN if speed issues occur during downloading of packages

REM Create virtual environment
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate

REM Install required packages
pip install -r requirnments.txt

REM Download NLP models and data
python -m spacy download en_core_web_sm
python -m nltk.downloader wordnet
python -m nltk.downloader punkt

REM Instructions for testing the API endpoint using Postman
echo.
echo "POST Request on Postman"
echo "http://127.0.0.1:5000/summarize_and_detect"
echo "Body -> Raw -> JSON"
echo.
echo "Example JSON payload:"
echo.
echo {
echo     "article1": "AirPods are precisely integrated with other Apple devices and services that make even more sense like automatic switching between devices, sharing beats with friends, and Find My integration to locate your misplaced earbuds, that round all of the experience you are having with Apple.   Conclusion: The technological achievements of Apple rank high on the world stage, with its flagship products having not only reshaped industries but also altered the way we collaborate, work, socialize, and live in general. With the iPhone as the icon, the MacBook has a sleek design, the Next-gen Apple Watch for smart-wear, the iPad is multi-functional, and the AirPods for no-wire entertainment, each of them has the best design, performance, and user experience.   As Apple continues to push the boundaries of innovation, one thing remains certain: The willingness and ability to continue being the best creates a future where the greatest discoveries will open up new possibilities and opportunities than we could have ever imagie",
echo     "article2": "music listening experience. Convenient installation, friendliness ease of use, and improved functions have made Air Pods one of the must-haves for users all over the world.   Key Features Wireless Convenience: Thanks to their wireless design and recognition by Apple devices without a wire, AirPods are offering the most convenient experience to people who can enjoy music, podcasts, and calls without the annoyance of the twirling of wire.   Active Noise Cancellation: With the newest AirPods release, there is active noise cancellation technology, which is more intelligent than voice cancellation.  Therefore, the latest AirPods Model can still cancel out background noise while commuting, working, or even in noisy environments.   Spatial Audio: With spatial audio support, AirPods produce a group-like listening experience not perceptibly different from movies or concerts, in which the sound is virtually adjusted to bring in more immersion and depth and enhance the user’s joy.   "
echo }
