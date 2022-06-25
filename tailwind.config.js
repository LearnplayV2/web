module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1C4F82",
          "secondary": "#7D919B",
          "accent": "#EB6B47",
          "neutral": "#23282F",
          "base-100": "#212121",
          "info": "#0092D6",
          "success": "#6CB288",
          "warning": "#DAAD58",
          "error": "#AB3D30",
        },
      },
    ],
  },
};
