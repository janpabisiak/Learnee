export interface IGameStrategy<TData = any, TAnswer = any, TResult = any> {
	generateGameData(): TData;
	validateAnswer(
		gameData: TData,
		answer: TAnswer,
	): { isCorrect: boolean; updatedData?: any; returnVal?: TResult };
}
