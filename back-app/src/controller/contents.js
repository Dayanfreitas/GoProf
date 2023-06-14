const { Content, Reports } = require("../model");
const express = require("express");
const authMiddleware = require("../middlewares/auth");
const authMySelfMiddleware = require("../middlewares/myself");
const router = express.Router();

const linkBaseShared = (id) => {
  const { APP_URL_FRONT_END } = process.env;

  // return encodeURI('https://web.whatsapp.com/')
  return encodeURI(`${APP_URL_FRONT_END}/feed/${id}`);
};

const textCommonShareLink = () =>
  `Olá, veja esse conteúdo que encontrei no app GoProf`;

const whatsappShareLink = (id) =>
  `https://api.whatsapp.com/send?text=${
    textCommonShareLink() + encodeURI(":") + linkBaseShared(id)
  }`;
const facebookShareLink = (id) =>
  `https://www.facebook.com/sharer/sharer.php?u=${linkBaseShared(id)}`;
// const linkedinShareLink = (id, content) => `https://www.linkedin.com/sharing/share-offsite/?url=#{url}&title=${content.title}&summary=${linkBaseShared(id)}`
// const twitterShareLink = (id) => `https://twitter.com/share?text=${textCommonShareLink()}&url=${linkBaseShared(id)}&via=@user&hashtags=['a','b']}"`

router.get("/", async (req, res) => {
  const contents = await Content.query()
    .select("id")
    .from("contents")
    .where("filed", "=", false);

  const contentsIds = contents.map((content) => {
    return content.id;
  });

  res.status(200).json({ ok: true, contents: contentsIds });
});

router.get("/all", authMiddleware, async (req, res) => {
  const contents = await Content.query()
    .select("id", "title", "summary", "filed")
    .where("contents.user_id", "=", 4)
    .from("contents");

  res.status(200).json({ ok: true, contents: contents });
});

router.get("/link-shared/:id", async (req, res) => {
  const { id } = req.params;

  const content = await Content.query().findById(id);
  const links = {};

  if (content) {
    links.base = linkBaseShared(id);
    links.whatsapp = whatsappShareLink(id);
    links.facebook = facebookShareLink(id);
  }

  res.status(200).json({ ok: true, links });
});

router.get("/link-shared/:id", async (req, res) => {
  const { id } = req.params;

  const content = await Content.query().findById(id);
  const links = {};

  if (content) {
    links.base = linkBaseShared(id);
    links.whatsapp = whatsappShareLink(id);
    links.facebook = facebookShareLink(id);
  }

  res.status(200).json({ ok: true, links });
});

router.post("/reports", authMiddleware, async (req, res) => {
  const { content_id, type_report } = req.body;

  const typeReport =
    [
      "HATE_SPEECH",
      "NUDITY_AND_SEXUAL_CONTENT",
      "HARASSMENT_AND_BULLYING",
      "VIOLENCE_AND_DISTURBING_CONTENT",
      "COPYRIGHT_INFRINGEMENT",
      "FRAUD_AND_PHISHING",
      "INCITEMENT_TO_VIOLENCE",
      "TERRORISM_SPEECH",
      "FAKE_NEWS_AND_DISINFORMATION",
      "OTHERS",
    ].indexOf(type_report) >= 0;

  if (!typeReport) {
    return res.status(404).json({ message: "Not found type reports !" });
  }

  const content = await Content.query().findById(content_id);
  if (!content) {
    return res.status(404).json({ message: "Not found content !" });
  }

  let reports = await Reports.query().findOne({
    content_id: content_id,
    user_id: req.userID,
  });

  if (reports) {
    return res.status(200).json({
      ok: true,
      reports,
      message: "Resport successfully created !",
    });
  }

  reports = await Reports.query().insert({
    content_id,
    type_report,
    user_id: req.userID,
  });

  res.status(200).json({
    ok: true,
    reports,
    message: "Resport successfully created !",
  });
});

router.get("/:id", async (req, res) => {
  const content = await Content.query().findById(req.params.id);
  res.status(200).json({ ok: true, content });
});

router.post("/create", [authMiddleware], async (req, res) => {
  const { title, summary, description, image_path, video_path } = req.body;

  content = await Content.query().insert({
    title: title,
    summary: summary,
    description: description,
    image_path: image_path,
    video_path: video_path,
    user_id: req.userID,
  });

  res.status(200).json({
    ok: true,
    content,
  });
});

router.post("/filed", [authMiddleware], async (req, res) => {
  const { content_id, filed } = req.body;

  let content = await Content.query().findById(content_id);

  if (!content) {
    return res.status(404).json({ message: "Not found content !" });
  }

  if (content.user_id != req.userID) {
    return res.status(404).json({ message: "This content is not yours" });
  }

  content = await Content.query().patchAndFetchById(content_id, {
    filed: filed,
  });

  res.status(200).json({
    ok: true,
    content,
  });
});

module.exports = router;
