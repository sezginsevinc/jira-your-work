# 🚀 Jira Floating Your Work

Modern Chrome Extension for Jira - Display your assigned issues in a beautiful floating button with customizable position.

## ✨ Features

- **🎯 Floating Button**: Modern, glassy floating button that displays your assigned Jira issues
- **📍 Position Control**: Choose between left or right corner positioning
- **🎨 Beautiful UI**: Modern gradient popup design with smooth animations
- **⚡ Real-time Updates**: Fetches latest assigned issues from Jira
- **🎛️ Toggle Control**: Easy enable/disable functionality
- **🌟 Responsive Design**: Works perfectly on all screen sizes
- **🔐 Privacy-First**: No data collection, works entirely within your Jira instance

## 🖼️ Screenshots
![image](https://github.com/user-attachments/assets/d3e09bea-edaf-4398-9a20-51f431af5ee0)
![image](https://github.com/user-attachments/assets/46825583-ac78-47de-b785-f3eceea86ffb)

### Floating Button
The floating button appears in the bottom corner of your Jira pages, showing a quick count of your assigned issues.

### Modern Popup Interface
![Popup Interface](screenshots/popup-interface.png)
- **Script Control**: Toggle the extension on/off
- **Position Selection**: Choose left or right corner placement
- **Real-time Status**: Visual feedback for all actions

### Issue Dropdown
Click the floating button to see all your assigned issues in a beautiful dropdown with:
- Issue keys and summaries
- Project information
- Status indicators
- Direct links to issues

## 🛠️ Installation

### Chrome Web Store (Recommended)
*Coming soon...*

### Manual Installation
1. Clone this repository or download the ZIP file
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the project folder
5. The extension should now appear in your extensions list

### Build from Source
```bash
# Clone the repository
git clone https://github.com/yourusername/jira-floating-your-work.git

# Navigate to the project directory
cd jira-floating-your-work

# Install (no build process needed - pure vanilla JS)
# Just load the folder in Chrome extensions
```

## 🎯 Usage

1. **Install the extension** following the instructions above
2. **Navigate to any Jira page** (*.atlassian.net)
3. **Look for the floating button** in the bottom corner
4. **Click the button** to see your assigned issues
5. **Configure settings** by clicking the extension icon in the toolbar

### Configuration Options

- **Enable/Disable**: Toggle the floating button on/off
- **Position**: Choose between left or right corner placement
- **Real-time Status**: Visual feedback shows current state

## 🏗️ Project Structure

```
jira-floating-your-work/
├── manifest.json              # Extension manifest
├── src/
│   ├── background/
│   │   └── background.js      # Service worker
│   ├── content/
│   │   └── content.js         # Content script for Jira pages
│   └── popup/
│       ├── popup.html         # Extension popup UI
│       ├── popup.css          # Popup styles
│       └── popup.js           # Popup functionality
├── icons/
│   ├── icon16.png            # 16x16 icon
│   ├── icon48.png            # 48x48 icon
│   └── icon128.png           # 128x128 icon
└── README.md                 # This file
```

## 🔧 Technical Details

### Technologies Used
- **Vanilla JavaScript**: No frameworks, pure performance
- **Chrome Extensions API**: Manifest V3 compatibility
- **CSS3**: Modern styling with gradients and animations
- **GraphQL**: Efficient Jira API communication

### Key Features Implementation
- **Storage API**: Persistent settings storage
- **Message Passing**: Communication between popup and content script
- **Dynamic CSS**: Position-based styling
- **Animation System**: Smooth transitions and effects

### Browser Support
- ✅ Chrome 88+ (Manifest V3)
- ✅ Chromium-based browsers
- ✅ Chrome for Android (limited)

## 🌍 Compatibility

### Jira Versions
- ✅ Jira Cloud (*.atlassian.net)
- ✅ Jira Server (with GraphQL support)
- ✅ Jira Data Center

### Language Support
- 🇹🇷 Turkish (Primary)
- 🇺🇸 English
- *More languages can be added easily*

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test thoroughly on different Jira instances
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Issues](https://github.com/yourusername/jira-floating-your-work/issues)
- **Feature Requests**: [Issues](https://github.com/yourusername/jira-floating-your-work/issues)
- **Discussions**: [Discussions](https://github.com/yourusername/jira-floating-your-work/discussions)

## 🙏 Acknowledgments

- Thanks to Atlassian for providing the Jira API
- Inspired by modern web design trends
- Built with love for productivity enthusiasts

## 📊 Version History

### v1.0 (Current)
- ✅ Initial release
- ✅ Basic floating button functionality
- ✅ Position selection (left/right)
- ✅ Modern popup interface
- ✅ Real-time issue fetching
- ✅ Toggle control

### Planned Features
- 🔄 Auto-refresh intervals
- 🎨 Theme customization
- 🔔 Desktop notifications
- 📱 Mobile optimizations
- 🌐 Multi-language support

---

**Made with ❤️ for Jira users who want to stay productive**

*If you find this extension helpful, please consider giving it a ⭐ star on GitHub!*
