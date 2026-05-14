import styled from "styled-components";

export const HomeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  p {
    font-size: 2.8rem;
    color: #8e8a68a9;
    font-weight: 700;
    font-family: "Rubik", sans-serif;
    text-align: center;
    width: fit-content;
    height: fit-content;
    line-height: 1.6;
  }
`;

export const ContainerImage = styled.div`
  display: flex;
  width: 70%;
  height: 70%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// export const stretch = keyframes`
//   0%, 40%, 100% {
//     transform: scaleY(0.4);
//   }

//   20% {
//     transform: scaleY(1);
//   }
// `;

// const fade = keyframes`
//   0% {
//     opacity: 1;
//   }

//   100% {
//     opacity: 0.1;
//   }
// `;

// export const Container = styled.div`
//   position: relative;

//   width: 200px;
//   height: 000px;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const Line = styled.span<{ rotate: number; delay: number }>`
//   position: absolute;

//   width: 6px;
//   height: 18px;

//   background: #6b6b6e;
//   border-radius: 999px;

//   transform: rotate(${({ rotate }) => rotate}deg) translateY(-22px);

//   animation: ${fade} 1s linear infinite;
//   animation-delay: ${({ delay }) => delay}s;
// `;
