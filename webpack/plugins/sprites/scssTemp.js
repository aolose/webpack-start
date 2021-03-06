module.exports = `
@mixin sprite-width($sprite, $width) {
  @if $width{
    width: $width;
  }@else {
    width: nth($sprite, 1); 
  }
}
@mixin sprite-height($sprite, $width) {
  @if $width{
    height: $width * nth($sprite, 9);
  }@else {
    height: nth($sprite, 2); 
  }
}
@mixin sprite-position($sprite, $width) {
  @if $width {
      background-position: nth($sprite, 6)  nth($sprite, 7);
  }@else {
      background-position: nth($sprite, 3)  nth($sprite, 4);
  }
}
@mixin sprite-image($sprite, $width) {
  $sprite-image: nth($sprite, 5);
  background-image: url(#{$sprite-image});
  @if $width {
      background-size:  nth($sprite, 8) auto;
  }
}
@mixin sprite($sprite, $width:false) {
  @include sprite-image($sprite, $width);
  @include sprite-position($sprite, $width);
  @include sprite-width($sprite, $width);
  @include sprite-height($sprite, $width);
}
`;