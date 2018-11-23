module.exports = `
@mixin sprite-width($sprite) {
  width: nth($sprite, 1);
}
@mixin sprite-height($sprite) {
  height: nth($sprite, 2);
}
@mixin sprite-position($sprite) {
  $sprite-offset-x: nth($sprite, 3);
  $sprite-offset-y: nth($sprite, 4);
  background-position: $sprite-offset-x  $sprite-offset-y;
}
@mixin sprite-image($sprite) {
  $sprite-image: nth($sprite, 5);
  background-image: url(#{$sprite-image});
}
@mixin sprite($sprite) {
  @include sprite-image($sprite);
  @include sprite-position($sprite);
  @include sprite-width($sprite);
  @include sprite-height($sprite);
}
@mixin sprites($sprites) {
  @each $sprite in $sprites {
    $sprite-name: nth($sprite, 10);
    .#{$sprite-name} {
      @include sprite($sprite);
    }
  }
}
`