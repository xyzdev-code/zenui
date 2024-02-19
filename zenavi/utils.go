package main
type Result[T any] struct {
	val T
	err error
}
func (res *Result[T]) Ok() bool {
	return res.err == nil
}
func (res *Result[T]) Then(fn func()) *Result[T]{
	if res.Ok() {
		fn()
	}
	return res
}
func (res *Result[T]) Or(alt T) T {
	if res.Ok() {
		return res.val
	} else {
		return alt
	}
}
func (res *Result[T]) Catch(fn func(err error)) *Result[T]{
	if !res.Ok() {
		fn(res.err)
	}
	return res
}
func (res *Result[T]) Defualt(fn func()){
	fn()
}
func Ok[T any](val T) Result[T] {
	return Result[T]{
		val: val,
	}
}
func Err[T any](err error) Result[T] {
	return Result[T]{
		err: err,
	}
}
func ToResult[T any](val T, err error) Result[T] {
	return Result[T]{
		val: val,
		err: err,
	}
}
