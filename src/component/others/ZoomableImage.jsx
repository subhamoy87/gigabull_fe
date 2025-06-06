import React from 'react';
import Magnifier from 'react-magnifier';

const ZoomableImage = ({ selectedImage, name }) => {
  return (
    <div className='mx-auto w-full'>
      <Magnifier
        src={selectedImage}
        mgBorderWidth={1}
        mgShape='square'
        width={'100%'}
      />
    </div>
  );
};

export default ZoomableImage;
// import React from 'react';
// import ReactImageMagnify from 'react-image-magnify';

// const ZoomableImage = ({ selectedImage, name }) => {
//   return (
//     <div className='mx-auto w-full max-h-[600px]'>
//       <ReactImageMagnify
//         {...{
//           smallImage: {
//             alt: name,
//             isFluidWidth: true,
//             src: selectedImage,
//           },
//           largeImage: {
//             src: selectedImage,
//             width: 900,
//             height: 900,
//           },
//           enlargedImageContainerDimensions: {
//             width: '100%',
//             height: '100%',
//           },
//           enlargedImagePosition: 'over',
//           enlargedImageContainerStyle: { backgroundColor: 'rgba(0,0,0,.3)' },
//           isEnlargedImagePortalEnabledForTouch: true,
//           enlargedImageClassName: 'object-cover aspect-square w-full h-full',
//           enlargedImageContainerClassName: 'object-cover aspect-square w-full h-full',
//           enlargedImageStyle: { backgroundColor: 'rgba(0,0,0,.3)' },
//           imageClassName: 'object-cover aspect-square w-full h-full',
//           shouldHideHintAfterFirstActivation: true,
//           fadeDurationInMs : 300,
//           lensStyle: { backgroundColor: 'rgba(0,0,0,.3)' },
//           isHintEnabled: true,
//           shouldUsePositiveSpaceLens: true,
//         }}
//       />
//     </div>
//   );
// };

// export default ZoomableImage;
