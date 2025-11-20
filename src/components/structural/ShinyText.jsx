import ShinyText from "@/cuicui/other/text-animation/shiny-text/shiny-text";

function ShinyTextPreview(props) {
  return (
    <ShinyText speedInMs={3000} className="w-fit">
      {props}
    </ShinyText>
  );
};

export default ShinyTextPreview;