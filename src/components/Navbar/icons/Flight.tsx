import React from 'react'

const Flight = () => {
  return (
    <div>
        <svg
    className="w-4 h-4"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9418 16.873L16.2242 7.4112L18.4182 5.25525C18.9873 4.68248 19.3354 3.92688 19.401 3.12215C19.4378 2.77944 19.3966 2.43284 19.2805 2.1083C19.1644 1.78376 18.9764 1.48968 18.7305 1.24807C18.487 1.00153 18.1921 0.811612 17.8669 0.691801C17.5417 0.571991 17.1942 0.525222 16.8489 0.554814C16.0498 0.625139 15.3006 0.972808 14.731 1.53756L12.5217 3.74684L3.09798 0.0596311C2.95586 -0.000171398 2.79894 -0.0154394 2.64795 0.0158461C2.49696 0.0471315 2.35902 0.123497 2.25236 0.23485L0.530649 1.95656C0.450933 2.03412 0.389163 2.12818 0.34968 2.23216C0.310197 2.33613 0.293957 2.44749 0.302102 2.5584C0.315057 2.75033 0.396104 2.93134 0.530649 3.06882C0.552512 3.0932 0.578253 3.11379 0.606832 3.12977L2.48853 4.59246L2.25236 4.82863C2.10487 4.97612 2.02201 5.17617 2.02201 5.38476C2.02201 5.59335 2.10487 5.79339 2.25236 5.94089C2.39986 6.08838 2.5999 6.17124 2.80849 6.17124C3.01708 6.17124 3.21713 6.08838 3.36462 5.94089L3.73791 5.5676L5.0711 6.60367L4.82732 6.84745C4.67982 6.99495 4.59696 7.19499 4.59696 7.40358C4.59696 7.61217 4.67982 7.81222 4.82732 7.95971C4.97481 8.10721 5.17486 8.19007 5.38345 8.19007C5.59204 8.19007 5.79208 8.10721 5.93958 7.95971L6.32049 7.5788L7.65367 8.61488L5.07872 11.2203L4.67495 11.6545L2.1838 10.6946C2.04191 10.6375 1.88609 10.6243 1.73662 10.6569C1.58716 10.6895 1.45097 10.7664 1.3458 10.8775L0.241157 11.9821C0.165042 12.0534 0.104367 12.1395 0.0628854 12.2352C0.0214041 12.3308 0 12.434 0 12.5383C0 12.6425 0.0214041 12.7457 0.0628854 12.8413C0.104367 12.937 0.165042 13.0231 0.241157 13.0944L2.57995 15.4332C2.54186 15.5703 2.49615 15.7074 2.46567 15.8446C2.40711 16.0782 2.41009 16.3231 2.47432 16.5552C2.53855 16.7874 2.66184 16.999 2.83218 17.1693C3.00251 17.3396 3.21407 17.4629 3.44624 17.5272C3.67841 17.5914 3.92325 17.5944 4.15692 17.5358L4.56068 17.4215L6.90709 19.7603C6.97826 19.8352 7.06392 19.8949 7.15887 19.9356C7.25383 19.9764 7.35608 19.9974 7.45941 19.9974C7.56274 19.9974 7.66499 19.9764 7.75994 19.9356C7.85489 19.8949 7.94056 19.8352 8.01173 19.7603L9.12399 18.6481C9.23379 18.542 9.3092 18.4054 9.34045 18.256C9.37169 18.1066 9.35732 17.9512 9.29921 17.8101L8.34693 15.3189C8.49168 15.1894 8.63642 15.0599 8.77355 14.9228L11.3485 12.3402L12.3922 13.681L12.0113 14.0543C11.9352 14.1255 11.8745 14.2117 11.833 14.3073C11.7915 14.403 11.7701 14.5061 11.7701 14.6104C11.7701 14.7147 11.7915 14.8178 11.833 14.9135C11.8745 15.0091 11.9352 15.0953 12.0113 15.1665C12.0825 15.2427 12.1687 15.3033 12.2643 15.3448C12.36 15.3863 12.4632 15.4077 12.5674 15.4077C12.6717 15.4077 12.7748 15.3863 12.8705 15.3448C12.9662 15.3033 13.0523 15.2427 13.1235 15.1665L13.3597 14.9304L14.4034 16.2636L14.0301 16.6369C13.9571 16.7099 13.8991 16.7966 13.8596 16.892C13.8201 16.9874 13.7998 17.0897 13.7998 17.193C13.7998 17.2963 13.8201 17.3985 13.8596 17.494C13.8991 17.5894 13.9571 17.6761 14.0301 17.7491C14.1031 17.8221 14.1898 17.8801 14.2853 17.9196C14.3807 17.9591 14.483 17.9795 14.5862 17.9795C14.6895 17.9795 14.7918 17.9591 14.8872 17.9196C14.9826 17.8801 15.0693 17.8221 15.1424 17.7491L15.3709 17.5129L16.8336 19.3946L16.9022 19.4708C17.0388 19.6021 17.2162 19.6828 17.405 19.6994C17.5171 19.7087 17.63 19.693 17.7353 19.6535C17.8407 19.6139 17.936 19.5516 18.0144 19.4708L19.7362 17.7415C19.8574 17.6368 19.9426 17.4964 19.9795 17.3405C20.0164 17.1846 20.0032 17.021 19.9418 16.873ZM3.18179 13.8105L1.87907 12.5078L2.07714 12.3173L3.67697 12.9268C3.49717 13.2128 3.3319 13.5078 3.18179 13.8105ZM2.2676 2.43651L3.02942 1.67469L11.3409 4.92767L8.80402 7.46453L2.2676 2.43651ZM7.4556 18.0767L6.1605 16.7816C6.45761 16.6292 6.75473 16.4616 7.0366 16.2864L7.65367 17.8862L7.4556 18.0767ZM7.66129 13.7953C6.65989 14.7941 5.42337 15.525 4.0655 15.9207C4.46651 14.5498 5.21127 13.3042 6.22907 12.3021L15.8432 2.64982C16.1496 2.34327 16.5542 2.15446 16.986 2.11655C17.0994 2.1061 17.2137 2.12121 17.3205 2.16076C17.4273 2.20031 17.5238 2.2633 17.6031 2.34509C17.6899 2.43146 17.7546 2.53749 17.7917 2.6542C17.8289 2.7709 17.8373 2.89483 17.8164 3.0155C17.7811 3.43974 17.5945 3.83719 17.2907 4.13537L7.66129 13.7953ZM17.5269 17.6958L12.4684 11.2203L15.0129 8.68344L18.2582 16.9949L17.5269 17.6958Z"
      fill="white"
    />
  </svg>
    </div>
  )
}

export default Flight