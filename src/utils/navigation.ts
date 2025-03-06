import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: unknown) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function push(name: string, params: unknown) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.push(name, {
        params,
      }),
    );
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function pop(count: number) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

export function resetToScreen(
  screenName: string,
  index?: number,
  params?: any,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: index || 0,
        routes: [{name: screenName, params: params || {}}],
      }),
    );
  }
}

export type RootStackParamList = {};
