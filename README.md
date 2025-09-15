# React Scaling Layout

[](https://www.google.com/search?q=https://badge.fury.io/js/%2540your-npm-username%252Freact-scaling-layout)
[](https://opensource.org/licenses/MIT)

`@sspzoa/react-scaling-layout`은 뷰포트 너비에 따라 전체 콘텐츠를 동적으로 스케일링하는 반응형 React 레이아웃 컴포넌트입니다. 특정 최소 너비(예: 768px)를 기준으로 디자인된 레이아웃이 작은 화면에서도 디자인 일관성을 유지하도록 도와줍니다.

## ✨ 왜 필요한가요?

- **디자인 일관성 유지**: 태블릿 사이즈(예: 768px)에 맞춰 디자인된 화면이 모바일 화면(예: 360px)으로 줄어들 때, 모든 요소(폰트, 패딩, 이미지 등)의 비율을 그대로 유지하고 싶을 때 유용합니다.
- **간편한 반응형 처리**: 복잡한 미디어 쿼리나 각 요소의 크기를 개별적으로 조정할 필요 없이, 전체 레이아웃을 하나의 단위처럼 축소하여 반응형을 구현합니다.
- **고정된 종횡비**: 콘텐츠 영역 전체가 일정한 비율로 조절되므로, 디자인 시안의 느낌을 그대로 유지할 수 있습니다.

## 🚀 설치하기

```bash
# npm 사용 시
npm install @sspzoa/react-scaling-layout

# yarn 사용 시
yarn add @sspoa/react-scaling-layout
```

## 📖 사용법

### 기본 사용법

`ScalingLayout` 컴포넌트로 스케일링을 적용하고 싶은 부분을 감싸주세요. 일반적으로 앱의 최상위 또는 페이지의 루트 컴포넌트를 감쌉니다.

```jsx
// App.jsx
import { ScalingLayout } from '@sspzoa/react-scaling-layout';
import MyPage from './MyPage';

function App() {
  return (
    // minWidth를 768px로 설정하면, 화면 너비가 768px보다 작아질 때 내용이 축소됩니다.
    <ScalingLayout minWidth={768}>
      <MyPage />
    </ScalingLayout>
  );
}

export default App;
```

### `useScaling` 훅 사용하기

`ScalingLayout`의 자식 컴포넌트에서는 `useScaling` 훅을 사용하여 현재 스케일 값이나 창 크기 등의 정보에 접근할 수 있습니다.

```jsx
// MyComponent.jsx
import { useScaling } from '@sspzoa/react-scaling-layout';

function MyComponent() {
  const { scale, windowWidth, scaledVh } = useScaling();

  const headerStyle = {
    // 현재 스케일에 관계없이 항상 2px 두께의 border를 유지하고 싶을 때
    border: `${2 / scale}px solid black`,
    // 스케일링된 환경에서 정확한 10vh 높이를 계산
    height: `${scaledVh(10)}px`,
  };

  return (
    <div>
      <p>현재 창 너비: {windowWidth}px</p>
      <p>현재 스케일: {scale.toFixed(2)}</p>
      <header style={headerStyle}>
        이 헤더는 스케일링된 환경에 맞춰져 있습니다.
      </header>
    </div>
  );
}
```

## ⚙️ API

### `<ScalingLayout />` Props

| Prop                          | Type      | Default | 설명                                                                                                  |
| ----------------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `children`                    | `ReactNode` | -       | 내부에 렌더링될 React 컴포넌트입니다.                                                                    |
| `minWidth`                    | `number`  | `768`   | 스케일링이 시작되는 기준 너비(px)입니다. 뷰포트가 이 너비보다 작아지면 콘텐츠가 축소됩니다.               |
| `className`                   | `string`  | `""`    | 레이아웃을 감싸는 `div`에 적용할 CSS 클래스입니다.                                                       |
| `disableScalingAboveMinWidth` | `boolean` | `true`  | `true`일 경우, 뷰포트가 `minWidth`보다 커져도 콘텐츠가 확대되지 않고 원본 크기(scale: 1)를 유지합니다. |
| `maxScale`                    | `number`  | `1`     | `disableScalingAboveMinWidth`가 `false`일 때, 확대될 수 있는 최대 스케일 값을 제한합니다.               |
| `scaleStep`                   | `number`  | `0.01`  | 스케일 값의 정밀도를 설정합니다. 예를 들어 `0.01`은 소수점 두 자리까지 스케일 값을 계산합니다.          |

### `useScaling()` 반환 값

| 값             | Type                | 설명                                                                                                                                                             |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `windowWidth`  | `number`            | 현재 브라우저 창의 내부 너비(px)입니다.                                                                                                                          |
| `windowHeight` | `number`            | 현재 브라우저 창의 내부 높이(px)입니다.                                                                                                                          |
| `scale`        | `number`            | 현재 적용된 스케일 값입니다. (예: `minWidth`가 768px이고 `windowWidth`가 384px이면 `0.5`)                                                                          |
| `scaledVh`     | `(vh: number) => number` | 스케일링된 환경에 맞는 `vh` 단위를 `px` 값으로 변환해주는 함수입니다. CSS의 `vh`는 `transform: scale`의 영향을 받지 않으므로, 정확한 높이 계산이 필요할 때 사용합니다. |

## 📜 라이선스

이 프로젝트는 [MIT 라이선스](https://opensource.org/licenses/MIT)를 따릅니다.