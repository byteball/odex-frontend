import React from 'react';

const Svg2give = props => (
  <svg width={64} height={64} {...props}>
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.737-7.144v1.463H16V24.13h-1.463v.726h.726zm-7.337-8.03H7.2v3.652h.726v-1.463h.737v-1.463h-.737v-.726zm8.811 4.378v2.189h.726v-2.189h-.726zM16 23.393v.737h.737v-.737H16zm-7.337-.726v2.189h2.2v-2.189h-2.2zM7.2 15.363v.726h.737v-.726H7.2zm4.4-1.463v.737h.737V13.9H11.6zm4.4-.737v1.463h.737v-1.463H16zm-9.537-2.189v2.189h2.2v-2.189h-2.2zm6.6 13.882v1.463h.737v-1.463h-.737zm.737-11.693h-.726v1.463h.726V13.9h.737v-1.463H13.8v.726zm.737-1.452v.726h.726v-.726h-.726zm0 2.189v.726h.726V13.9h-.726zm-3.674 1.463v.726h2.2v-.726h-2.2zm2.937-2.926v-.726h.726v-.737H13.8V9.522h-2.2v.726h1.463v.726h-.737v.726H11.6v.726h-.726v-.715h-.748v-.726h.737v.715h.737v-.726h-.726V9.522H5v5.115h5.874V13.9h.726v-1.463h.737v.726h.737v-.726h.726zM9.4 13.9H5.737v-3.652H9.4V13.9zm.726 0v-1.463h.737V13.9h-.737zm2.937-2.2v-.715h.737v.715h-.737zm5.874 8.041v-.726h-1.474v-1.463h-.726v.726h-.726v-.726h.726v-2.2h-1.463v.737h-.748v1.463H13.8v.726h.737v-.726h.726v2.189H13.8v-.726h-.737v-1.463h-.726v-.726h-1.474V16.1h-.737v-.726H8.663v.726h-.737v.726h.737v.726H9.4v-.726h.737v.726H9.4v.726h.737v.726h.726v-.726h.737v-.726h.726v.726H11.6v.726h-.726v1.463h1.463v.737h-1.474v-.726h-.737v.726H8.663v-.726h-.726v.726H7.2v5.115h5.137V21.93h.726v2.2h1.474v-.726h.737V21.93h-.737v-.726H13.8v.726h-.726v-1.463h2.2v.726h.737v-1.452h1.452v.737h.737v-.737h.737zM11.6 25.582H7.937V21.93H11.6v3.652zm.737-5.841H11.6v-.726h.737v.726zm1.463 2.926h.737v.726H13.8v-.726zm5.137-13.145v1.452h.726V9.522h-.726zm-1.474 0h-.726v2.189H16v.726h.737v.726h.726v1.463h.737v-1.463h.737v1.474h.726V13.9h.737v-1.463h-1.463v-1.463h-1.474V9.522zm6.6 8.03H22.6v.726h-.737v.737h-.726v-2.189h.726v-.737h-.726v.726H20.4v.737h-.737v-1.463h-.726v1.463H18.2v.737l.737-.011h.726v1.463h2.2v.737h-2.2v.726h-.726v.726H18.2v.737h.737v.726H18.2v.737h.737v.726h.726v.726h-.726v.737H24.8V21.93h-.737v3.652H20.4V21.93h2.2v-2.915h.737v.726H24.8v-1.452h-.726v-.737h.726v-2.189h-.737v2.189zM18.2 20.478v.726h.737v-.726H18.2zm3.663-3.652v.726h.737v-.726h-.737zm1.474 3.652v.737H24.8v-.737h-1.463zm0-9.493v2.189h2.2v-2.189h-2.2zM20.4 13.9v.737h.737V13.9H20.4zm-2.937 1.463v.726h.737v-.726h-.737zm5.137 0v.726h.737v-.726H22.6zm-1.463 7.304v2.189h2.2v-2.189h-2.2zm-.737-7.304v.726h.737v-.726H20.4zm-5.137-4.389v.737H16v-.737h-.737zM20.4 9.522v.726h1.463v.726h-.737v.726H20.4v-.726h-.737v.737h.737v.715h.737v.726h.737v1.463H27V9.522h-6.6zm5.863 4.378H22.6v-3.652h3.663V13.9zM9.851 8.235c.506.341 1.078.407 1.529.429.385.022 1.034.022 1.716.022 1.265 0 2.75.022 2.904.022.407.011 1.65.011 2.75.011.682 0 1.32-.011 1.716-.022.451-.022 1.023-.099 1.529-.429.638-.429.957-1.133.957-2.09 0-.77-.319-1.232-.583-1.496-.715-.693-1.815-.649-2.178-.638h-.044c-.22 0-1.012.121-1.947.649-.825.462-1.54 1.122-2.123 1.947l-.066.165-.055-.088c-.616-.924-1.419-1.551-2.31-2.057-.924-.528-1.716-.638-1.936-.638h-.044c-.363-.011-1.463-.055-2.178.638-.484.462-.583 1.067-.583 1.496-.011.946.308 1.65.946 2.079zm8.888-2.464c.781-.451 1.375-.517 1.419-.517h.077c.627-.022 1.067.077 1.298.297.143.143.22.341.22.627 0 1.045-.495 1.276-1.342 1.32-.715.033-2.376.022-3.454.011a5.168 5.168 0 0 1 1.782-1.738zm-8.426-.253c.209-.198.583-.297 1.122-.297h.264c.044 0 .638.066 1.419.517.704.407 1.309.99 1.793 1.738-1.089.011-2.75.022-3.465-.011-.847-.044-1.342-.275-1.342-1.32 0-.286.066-.484.209-.627zm7.15 19.338h-.726v1.463h.737v-1.463h.726v-.726h-.737v.726z" />
  </svg>
);

export default Svg2give;